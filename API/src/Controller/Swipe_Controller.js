const { pool } = require("../Database/Connection");

async function swipeProfile(req, res) {
  const connection = await pool.getConnection();

  try {
    const { userId } = req.user;
    const { swipedId, action } = req.body;

    // Validate input
    if (!userId || !swipedId || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!["LIKE", "PASS"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid swipe action",
      });
    }

    if (userId === swipedId) {
      return res.status(400).json({
        success: false,
        message: "You cannot swipe on yourself",
      });
    }

    await connection.beginTransaction();

    // Lock both user rows in a consistent order.
    // This also helps prevent simultaneous mutual likes
    // from missing each other.
    const [users] = await connection.query(
      `SELECT user_id
       FROM users
       WHERE user_id IN (?, ?)
       ORDER BY user_id
       FOR UPDATE`,
      [userId, swipedId],
    );

    if (users.length !== 2) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 1. Save the swipe
    await connection.query(
      `INSERT INTO swipes (swiperId, swipedId, action)
       VALUES (?, ?, ?)`,
      [userId, swipedId, action],
    );

    let isMatch = false;
    let matchId = null;

    // 2. Only LIKE actions can create matches
    if (action === "LIKE") {
      const [reciprocalSwipe] = await connection.query(
        `SELECT swipe_id
         FROM swipes
         WHERE swiperId = ?
         AND swipedId = ?
         AND action = 'LIKE'
         LIMIT 1`,
        [swipedId, userId],
      );

      // 3. Check whether the other user liked us
      if (reciprocalSwipe.length > 0) {
        isMatch = true;

        // Sort IDs because your schema requires userOneId < userTwoId
        const [userOneId, userTwoId] = [userId, swipedId].sort();

        // 4. Create the match
        await connection.query(
          `INSERT INTO matches (userOneId, userTwoId)
           VALUES (?, ?)`,
          [userOneId, userTwoId],
        );

        const [matches] = await connection.query(
          `SELECT match_id
           FROM matches
           WHERE userOneId = ?
           AND userTwoId = ?`,
          [userOneId, userTwoId],
        );

        matchId = matches[0].match_id;
      }
    }

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: isMatch
        ? "It's a match!"
        : action === "LIKE"
          ? "Profile liked successfully"
          : "Profile passed successfully",
      isMatch,
      matchId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Swipe Profile Error:", error);

    // Already swiped on this profile
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "You have already swiped on this profile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to process swipe",
    });
  } finally {
    connection.release();
  }
}

module.exports = { swipeProfile };
