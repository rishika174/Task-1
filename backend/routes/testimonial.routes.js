const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares/demo");
const testimonialController = require("../controllers/testimonial.controller");
const testimonialPermission = require("../middlewares/testimonialPermission");
const multer = require('multer');
const imageController = require('../controllers/imageController');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Create a new testimonial (POST)
router.post("/api/testimonials", [authJwt.verifyToken, authJwt.hasAdminOrModeratorRole], testimonialController.createTestimonial);

// Get all testimonials (GET)
router.get("/api/testimonials", testimonialController.getAllTestimonials);

// Get a specific testimonial by ID (GET)
router.get("/api/testimonials/:id", testimonialController.getTestimonialById);

// Update a testimonial by ID (PUT)
router.put("/api/testimonials/:id", [authJwt.verifyToken, authJwt.hasAdminOrModeratorRole, testimonialPermission], testimonialController.updateTestimonial);

// Delete a testimonial by ID (DELETE)
router.delete("/api/testimonials/:id", [authJwt.verifyToken, authJwt.hasAdminOrModeratorRole, testimonialPermission], testimonialController.deleteTestimonial);

module.exports = router;
