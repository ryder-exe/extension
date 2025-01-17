const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getSubtitles } = require("youtube-captions-scraper");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openaiClient = new OpenAI({
	apiKey: "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",
});

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url) => {
	const match = url.match(
		/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
	);
	return match ? match[1] : null;
};

// Route to summarize captions
app.post("/test", async (req, res) => {
	const { ytlink } = req.body;

	if (!ytlink) {
		return res.status(400).json({ error: "YouTube link is required" });
	}

	const videoId = extractVideoId(ytlink);

	if (!videoId) {
		return res.status(400).json({ error: "Invalid YouTube link" });
	}

	try {
		// Fetch captions from YouTube
		const captions = await getSubtitles({
			videoID: videoId,
			lang: "en", // Specify language; fallback is 'en' for English
		});

		// Combine all captions into a single text
		const fullText = captions.map((caption) => caption.text).join(" ");

		// Summarize the text using OpenAI
		const response = await openaiClient.createCompletion({
			model: "text-davinci-003",
			prompt: `Summarize the following text:\n\n${fullText}`,
			max_tokens: 150,
			temperature: 0.7,
		});

		const summarizedText = response.data.choices[0].text.trim();
		res.json({ summarized_text: summarizedText });
	} catch (error) {
		console.error("Error processing request:", error.message);

		// Handle specific errors
		if (error.code === "insufficient_quota") {
			return res.status(429).json({
				error: "Quota exceeded. Please check your OpenAI account billing and limits.",
			});
		}

		res.status(500).json({ error: "An unexpected error occurred." });
	}
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
