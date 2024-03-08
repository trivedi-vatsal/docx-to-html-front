import moment from "moment";

const exportToHtmlFile = (content) => {
  // Get the current date and time using Moment.js
  const currentDateTime = moment().format("YYYY-MM-DD_HH-mm-ss");
  // Generate the file name using the current date and time
  const filename = `export_${currentDateTime}.html`;
  // Create a Blob with the content, specifying the type as text/html
  const blob = new Blob([content], { type: "text/html" });
  // Create a link element
  const link = document.createElement("a");
  // Set the URL to the blob
  link.href = URL.createObjectURL(blob);
  // Set the download attribute to the desired file name
  link.download = filename;
  // Append the link to the document
  document.body.appendChild(link);
  // Simulate a click on the link
  link.click();
  // Remove the link after downloading
  document.body.removeChild(link);
};

export default exportToHtmlFile;
