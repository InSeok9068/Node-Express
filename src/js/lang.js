let langList = [];

const findLangTag = langText => {
  const firstTagIdx = langText.indexOf("<with:message");

  if (firstTagIdx === -1) {
    return false;
  } else {
    const lastTagIdx = langText.substr(firstTagIdx).indexOf("/") + 2;

    const langTag = langText.substr(firstTagIdx, lastTagIdx);

    const langMap = new Map();

    if (langTag.includes("'")) {
      if (langTag.includes("msgkey")) {
        const msgKeyFirstIndex = langTag.indexOf("msgkey");
        const msgKeyMidIndex = langTag.substr(msgKeyFirstIndex).indexOf("=") + 2;
        const msgKeyLastIndex = langTag.substr(msgKeyFirstIndex + msgKeyMidIndex).indexOf("'");
        langMap.set("msgkey", langTag.substring(msgKeyFirstIndex + msgKeyMidIndex, msgKeyFirstIndex + msgKeyMidIndex + msgKeyLastIndex));
      }
      if (langTag.includes("nullvalue")) {
        const nullValueFirstIndex = langTag.indexOf("nullvalue");
        const nullValueMidIndex = langTag.substr(nullValueFirstIndex).indexOf("=") + 2;
        const nullValueLastIndex = langTag.substr(nullValueFirstIndex + nullValueMidIndex).indexOf("'");
        langMap.set(
          "nullvalue",
          langTag.substring(nullValueFirstIndex + nullValueMidIndex, nullValueFirstIndex + nullValueMidIndex + nullValueLastIndex)
        );
      }
    } else {
      if (langTag.includes("msgkey")) {
        const msgKeyFirstIndex = langTag.indexOf("msgkey");
        const msgKeyMidIndex = langTag.substr(msgKeyFirstIndex).indexOf("=") + 2;
        const msgKeyLastIndex = langTag.substr(msgKeyFirstIndex + msgKeyMidIndex).indexOf('"');
        langMap.set("msgkey", langTag.substring(msgKeyFirstIndex + msgKeyMidIndex, msgKeyFirstIndex + msgKeyMidIndex + msgKeyLastIndex));
      }
      if (langTag.includes("nullvalue")) {
        const nullValueFirstIndex = langTag.indexOf("nullvalue");
        const nullValueMidIndex = langTag.substr(nullValueFirstIndex).indexOf("=") + 2;
        const nullValueLastIndex = langTag.substr(nullValueFirstIndex + nullValueMidIndex).indexOf('"');
        langMap.set(
          "nullvalue",
          langTag.substring(nullValueFirstIndex + nullValueMidIndex, nullValueFirstIndex + nullValueMidIndex + nullValueLastIndex)
        );
      }
    }
    langList.push(langMap);

    findLangTag(langText.substr(firstTagIdx + lastTagIdx));
  }
};

$("#langBtn").click(() => {
  langList = [];
  const langText = $("#langText").val();

  findLangTag(langText);

  langList.forEach(obj => {
    console.table(obj);
  });
});
