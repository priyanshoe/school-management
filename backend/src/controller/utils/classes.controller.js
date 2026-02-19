const pool = require('../../db/db')

async function getClasses(req, res) {
    try {
        const [data] = await pool.query("select * from classes");
        if (data.length === 0) return res.status(409).json({ message: "Data not found" })
        return res.status(200).json({ message: "Data fetched", data: data })
    } catch (err) {
        return res.status(500).json({ message: "Error in data fetching", error: err.message })
    }
}

module.exports = {
    getClasses,
}