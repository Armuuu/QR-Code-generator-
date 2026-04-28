   function generateQRCode() {
  const text = document.getElementById("text").value.trim();
  if (!text) {
    alert("Please enter some text or a URL.");
    return;
  }

  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  currentImageURL = '';

  new QRCode(qrDiv, {
  text: text,
  width: 200,
  height: 200,
  correctLevel: QRCode.CorrectLevel.H
});

  const observer = new MutationObserver(() => {
  const img = qrDiv.querySelector("img");
  if (img && img.src.startsWith("data:image")) {
    currentImageURL = img.src;
    observer.disconnect();
  }
});

  observer.observe(qrDiv, { childList: true, subtree: true });
}

    function downloadQRCode() {
  const img = document.querySelector("#qrcode img");
  const canvas = document.querySelector("#qrcode canvas");

  let dataURL = "";
  if (img && img.src) {
    dataURL = img.src;
  } else if (canvas) {
    dataURL = canvas.toDataURL("image/png");
  } else {
    alert("Please generate a QR code first.");
    return;
  }

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "qr-code.png";
  link.click();
}
  
  async function shareQRCode() {
  const img = document.querySelector("#qrcode img");
  const canvas = document.querySelector("#qrcode canvas");

  let dataURL = "";
  if (img && img.src) {
    dataURL = img.src;
  } else if (canvas) {
    dataURL = canvas.toDataURL("image/png");
  } else {
    alert("Please generate a QR code first.");
    return;
  }

  try {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    const file = new File([blob], "qr-code.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "QR Code",
        text: "Check out this QR Code",
        files: [file]
      });
    } else {
      alert("Sharing is not supported on this device.");
    }
  } catch (error) {
    alert("Sharing failed.");
    console.error("Error sharing:", error);
  }
}
  
