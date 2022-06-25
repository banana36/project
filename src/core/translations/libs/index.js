export default class ParserUtility {
  static capitalizeAll(text) {
    if (!text || typeof text !== "string") return text;
    return `${text?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() || ""}${
      text?.toLocaleLowerCase().slice(1) || ""
    }`;
  }

  static lowerCase(text) {
    if (!text || typeof text !== "string") return text;
    return text?.toLocaleLowerCase();
  }

  static upperCase(text) {
    if (!text || typeof text !== "string") return text;
    return text?.toLocaleUpperCase();
  }

  static getRawLabel(text, type = "capitalizeAll") {
    if (!text || typeof text !== "string") return "";
    const splittedText = text
      .replace(/<B>/g, "@-@-@<B>@-@-@")
      .replace(/<\/B>/g, "@-@-@</B>@-@-@")
      .replace(/<A>/g, "@-@-@<A>@-@-@")
      .replace(/<\/A>/g, "@-@-@</A>@-@-@")
      .replace(/ /g, "@-@-@<Spacer>@-@-@")
      .split("@-@-@")
      .filter((filteredElement) => !!filteredElement);

    let response = "";
    splittedText.forEach((splittedTextInstance) => {
      if (
        splittedTextInstance == "<B>" ||
        splittedTextInstance == "<A>" ||
        splittedTextInstance == "</B>" ||
        splittedTextInstance == "</A>"
      ) {
        response = response.concat(splittedTextInstance);
      } else if (splittedTextInstance == "<Spacer>") {
        response = response.concat(" ");
      } else {
        response = response.concat(
          type == "capitalizeAll"
            ? this.capitalizeAll(text)
            : type == "upperCase"
            ? this.upperCase(text)
            : this.lowerCase(text)
        );
      }
    });
    return response;
  }

  static getLabel(text, replace) {
    if (!text || typeof text !== "string") return "";
    if (!replace || !Array.isArray(replace)) return text;
    if (!replace[0]?.key || !replace[0]?.value) return text;
    let normalizedText = text;
    replace.forEach((replaceElement) => {
      if (!!replaceElement?.key && !!replaceElement?.value) {
        normalizedText = normalizedText?.replace(
          replaceElement?.key,
          replaceElement?.value
        );
      }
    });
    return normalizedText;
  }
}
