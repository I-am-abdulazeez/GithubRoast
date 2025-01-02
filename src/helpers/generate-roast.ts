import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateRoast = async (
  username: string,
  bio: string | null,
  soundNigerian: boolean,
  location: string | null,
  followers: number,
  public_repos: number,
  followings: number
) => {
  try {
    // Base prompt structure
    let basePrompt = `Write a brutal yet witty roast for the GitHub user with the username "${username}". Ensure the roast is lighthearted, fun, and creative.
    - **Tone:** 100% roasting. Don't act nice. Very wicked text. Show no respect. You're a roast king. Let them cry and laugh at the same time.
    - **Bio:** ${bio ? `Their bio reads: "${bio}". Include commentary on this.` : `This user has no bio. Make it harsher and call them out for not giving others a chance to know them better.`}
    - **Location:** ${location ? `They're located in "${location}". Highlight this in the roast.` : `Their location is missing. Mock their lack of transparency.`}
  - **Stats:** Mention their GitHub stats:
  - Followers: ${followers}
  - Following: ${followings}
  - Public Repositories: ${public_repos}
  Be ruthless in pointing out if these stats are underwhelming or unimpressive, but keep it witty. 100 words max

  Optional: If they have a strong profile, acknowledge it with sarcastic praise while keeping the roast lighthearted.
`;

    if (bio && bio.trim()) {
      basePrompt += ` Include commentary on their bio: "${bio}".`;
    } else {
      basePrompt += ` Emphasize that this user has no bio on their GitHub profile. Make it harsher and call them out for not giving others a chance to know them better.`;
    }

    if (location && location.trim()) {
      basePrompt += ` Highlight the fact that they are located in "${location}" and make it part of the roast.`;
    }

    basePrompt += ` Mention their GitHub stats: ${followers} followers, ${followings} followings, and ${public_repos} public repositories. Be ruthless in pointing out if these stats are underwhelming or unimpressive.`;

    // Nigerian humor addon
    const nigerianPromptAddon = `
    Roast this user like a Naija comedian just discovered their GitHub profile.
    - Use Pidgin English and pepper your roast with witty Nigerian humor.
    - Include relatable Naija proverbs, sarcastic remarks, and spicy commentary.
    - Deliver the roast with the intensity of a Naija mum dishing out life lessons.
    - Make sure the roast is so spicy, it leaves them gasping for breath and begging for more.`;

    const prompt = soundNigerian ? `${basePrompt} ${nigerianPromptAddon}` : basePrompt;

    // Generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);

    // Extract and process the text
    const text = await result.response.text();
    if (text) {
      return {
        success: true,
        data: text.trim(),
      };
    }

    return {
      success: false,
      message: "Failed to generate a roast. Please try again.",
    };
  } catch (error) {
    // Narrowing the 'error' type
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An error occurred while generating the roast.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred while generating the roast.",
    };
  }
};
