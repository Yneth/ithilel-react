export async function validateImageUrl(imageUrl?: string) {
  const result = [];
  if (imageUrl) {
    let url;
    try {
      url = new URL(imageUrl);
    } catch (e) {
      result.push("Background image should be a valid URL");
      return result;
    }

    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      result.push("Background image URL cannot be fetched");
      return result;
    }

    if (!response.ok) {
      result.push(
        "Background image URL should respond with successful HTTP Status Code",
      );
      return result;
    }
    const buff = await response.blob();
    if (!buff.type.startsWith("image/")) {
      result.push("Background image URL should be a link to an image");
    }
  }
  return result;
}

export async function validateCategory(value?: string) {
  const result = [];
  if (!value) {
    result.push("Category is required");
  } else if (value.length < 4 || value.length > 128) {
    result.push("Category should be of size between 4 and 128");
  }
  return result;
}

export async function validateName(name?: string) {
  const result = [];
  if (!name) {
    result.push("Event Name is required");
  } else if (name.length < 4 || name.length > 128) {
    result.push("Event Name should be of size between 4 and 128");
  }
  return result;
}

export async function validateDescription(description?: string) {
  const result = [];
  if (!description) {
    result.push("Event Description is required");
  } else if (description.length < 4 || description.length > 128) {
    result.push("Description should be of size between 4 and 128");
  }
  return result;
}

export async function validateOutcomeName(outcomeName?: string) {
  const result = [];
  if (!outcomeName) {
    result.push("Outcome name is required");
  } else if (outcomeName.length < 4 || outcomeName.length > 128) {
    result.push("Outcome name should be of size between 4 and 128");
  }
  return result;
}
