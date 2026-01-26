import { UserData } from "@/store/slices/authSlice";

export function formDataToMetaArray(data: Partial<UserData>) {
  const meta: { meta_key: string; meta_value: string }[] = [];

  const map: Record<string, string> = {
    bio: "bio",
    location: "location",
    height: "height_cm",
    zodiac: "zodiac",
    occupation: "occupation",
    education: "education",
    budgetRange: "budget_range",
    datingIntention: "dating_intention",
    sexualOrientation: "sexual_orientation",
    personalityType: "personality_type",
    communicationStyle: "communication_style",
    promptQuestion: "prompt_question",
    promptAnswer: "prompt_answer",
    "lifestyle.smoking": "smoking",
    "lifestyle.drinking": "drinking",
    "lifestyle.pets": "pets",
    "socialLinks.instagram": "instagram_handle",
  };

  Object.entries(map).forEach(([key, metaKey]) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      const value = (data[parent as keyof UserData] as any)?.[child];
      if (value) meta.push({ meta_key: metaKey, meta_value: String(value) });
    } else {
      const value = data[key as keyof UserData];
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          meta.push({ meta_key: metaKey, meta_value: value.join(", ") });
        } else {
          meta.push({ meta_key: metaKey, meta_value: String(value) });
        }
      }
    }
  });

  return meta;
}