const { pool } = require("../Database/Connection");

async function getProfiles(req, res) {
  try {
    const { userId } = req.user;

    const [profiles] = await pool.query(
      `SELECT
                u.user_id,
                u.name,
                u.photoUrl,
                u.bio,
                u.city,
                u.college,
                u.interests
            FROM users u
            WHERE u.user_id != ?
            AND NOT EXISTS (
                SELECT 1
                FROM swipes s
                WHERE s.swiperId = ?
                AND s.swipedId = u.user_id
            )
            ORDER BY u.createdAt DESC
            LIMIT 6`,
      [userId, userId],
    );

    const hasMore = profiles.length > 5;

    return res.status(200).json({
      success: true,
      profiles: profiles.slice(0, 5),
      hasMore,
    });
  } catch (error) {
    console.error("Get Profiles Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
    });
  }
}

module.exports = { getProfiles };

module.exports = { getProfiles };
