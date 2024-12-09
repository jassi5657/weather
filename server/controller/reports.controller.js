const Report = require("../model/reports");


exports.getUserWeatherReports = async (req, res) => {
  try {
    // Ensure req.user is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access. User not logged in." });
    }

    const userId = req.user.id;

    // Fetch reports associated with the user
    const reports = await Report.findAll({
      where: { userId },
    });

    // Check if reports were found
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found for this user." });
    }

    // Return the reports
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching user reports:", error);
    res.status(500).json({ message: "Error retrieving reports", error });
  }
};




exports.weatherReport =  async (req, res) => {
    const { city, temperature, windSpeed } = req.body;
  
    try {
      const newReport = await Report.create({
        city,
        temperature,
        windSpeed,
        userId: req.user.id, // Associate the report with the authenticated user
      });
      res.status(201).json(newReport);
      console.log("error")
    } catch (error) {
      res.status(500).json({ message: 'Error saving report', error });
    }
  };


  