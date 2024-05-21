import "../../public/dist/pspdfkit.js";

// We need to inform PSPDFKit where to look for its library assets, i.e. the location of the `pspdfkit-lib` directory.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

export function showPdf(container,urlpdf){
	PSPDFKit.load({
		baseUrl,
		container: container,
		document: urlpdf
	})
	.then(instance => {
		console.log("PSPDFKit loaded", instance);
	})
	.catch(error => {
		console.error(error.message);
	});
}
