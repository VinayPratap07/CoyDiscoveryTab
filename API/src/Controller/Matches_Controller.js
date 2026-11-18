const { pool } = require("../Database/Connection");

async function getMatches(req, res) {
  try {
    const { userId } = req.user;

    const [matches] = await pool.query(
      `SELECT
          m.match_id,
          u.user_id,
          u.name,
          u.photoUrl
       FROM matches m
       JOIN users u
         ON u.user_id = CASE
           WHEN m.userOneId = ? THEN m.userTwoId
           ELSE m.userOneId
         END
       WHERE m.userOneId = ? OR m.userTwoId = ?
       ORDER BY m.createdAt DESC`,
      [userId, userId, userId],
    );

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    console.error("Get Matches Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
    });
  }
}

module.exports = { getMatches };
