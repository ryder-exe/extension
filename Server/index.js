const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getSubtitles } = require("youtube-captions-scraper");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const openaiClient = new OpenAI({
	apiKey: "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",
});

const completion = openaiClient.chat.completions.create({
	model: "gpt-4o-mini",
	store: true,
	messages: [{ role: "user", content: "write a haiku about ai" }],
});

completion.then((result) => console.log(result.choices[0].message));

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
		const captions = await getSubtitles({
			videoID: videoId,
			lang: "en", // Specify language; fallback is 'en' for English
		});

		const fullText = captions.map((caption) => caption.text).join(" ");

		const response = await openaiClient.createCompletion({
			model: "text-davinci-003", // Choose a suitable model
			prompt: `Summarize the following text:\n\n${fullText}`,
			max_tokens: 150,
			temperature: 0.7,
		});

		const summarizedText = response.data.choices[0].text.trim();

		res.json({ summarized_text: summarizedText });
	} catch (error) {
		console.error("Error summarizing YouTube captions:", error.message);
		res.status(500).json({ error: "Failed to process the YouTube video" });
	}
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
