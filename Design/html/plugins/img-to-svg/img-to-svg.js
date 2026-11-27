/**
 * Replaces all img elements that use SVG and SVGZ (compressed SVG) images
 * as the source with an inline SVG element.
 *
 * Note: if any img DOM elements using svgs are cached before this
 * function, they will no longer be valid as these elements
 * will be replaced.
 *
 * To get around this, pass a callback function to this methods parameter
 * that will be execute once all images have finished loading.
 *
 * @param callback
 */
function SVGInline(callback) {

    var images = $('.js-svg-icon');
    var images_length = images.length;

    function request_end() {

        images_length -= 1;

        if (images_length === 0 && callback) {
            callback();
        }

    }

    images.each(function () {
        var img = $(this);
        var imgURL = img.attr('src');
        var file_extension = imgURL.substr(imgURL.lastIndexOf('.') + 1);

        // If the file extension is svg or svgz, replace element for inline svg
        if (file_extension === 'svg' || file_extension === 'svgz') {
            var imgWidth = img.attr('width');
            var imgHeight = img.attr('height');
            var imgID = img.attr('id');
            var imgClass = img.attr('class');

            // Get svg file (note this could be optimised if the image has already
            // been downloaded to not GET request the resource again)
            $.ajax({
                "url": imgURL,
                "success": function (data) {
                    // Get the SVG tag, ignore the rest
                    var svg = $(data).find('svg');

                    // Add replaced image's width to the new SVG
                    if (typeof imgWidth !== 'undefined')
                        svg = svg.attr('width', imgWidth);

                    // Add replaced image's height to the new SVG
                    if (typeof imgHeight !== 'undefined')
                        svg = svg.attr('height', imgHeight);

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined')
                        svg = svg.attr('id', imgID);

                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined')
                        svg = svg.attr('class', imgClass);

                    // Remove any invalid XML tags as per http://validator.w3.org
                    svg = svg.removeAttr('xmlns:a');

                    // Replace image with new SVG
                    img.replaceWith(svg);
                },
                "complete": function(){
                    request_end();
                },
                "dataType": 'xml'
            });
        }
        else {
            request_end();
        }
    });
}