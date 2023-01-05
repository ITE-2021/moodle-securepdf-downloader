const id = new URLSearchParams(document.location.search).get("id");
const pages = parseInt(document.querySelector('div.mod_securepdf_pages').innerText.split('/')[1]);

const downloadSecurePdfPage = (currentPage) => {
    if (currentPage < pages) {
        fetch(`https://eportal.pwr.edu.pl/mod/securepdf/view.php?id=${id}&page=${currentPage}`).then((res) => (res.text())).then((res) => {
            downloadFile(parseHTML(res).querySelector('div[role=main] img').src, currentPage + 1);
            setTimeout(() => downloadSecurePdfPage(currentPage + 1), 1000);
        });
    }
}
const downloadFile = (content, name) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = content;
    downloadLink.download = name;
    downloadLink.click();
}
const parseHTML = (innerHTML) => {
    const docfrag = document.createDocumentFragment();
    const html = document.createElement('html');
    html.innerHTML = innerHTML;
    for (i = 0; 0 < html.childNodes.length;) {
        docfrag.appendChild(html.childNodes[i]);
    }
    return docfrag;
}

downloadSecurePdfPage(0);