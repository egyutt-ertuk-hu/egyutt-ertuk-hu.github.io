gapi.client.init({
    apiKey: 'AIzaSyD5zJmRAo5o9d4f13ZaT23TisRH1edy_sE'
});

gapi.client.load('drive', 'v3', () => {
    let drive = gapi.client.drive;
    console.log(folder_id);
    let query = "'" + folder_id + "' in parents and trashed = false and mimeType contains 'image/'";
    console.log(query);
    drive.files.list({
        corpora: "drive",
        driveId: "0APuBYuKbrjVuUk9PVA",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        q: query,
        fields: "nextPageToken, files(id, name, thumbnailLink, webContentLink)"
    }).then(function (response) {
        // var container = document.getElementById('image-container');
        var container = document.getElementsByClassName('gallery')[0];
        for (var i = 0; i < response.result.files.length; i++) {
            var file = response.result.files[i];
            var box = document.createElement('div');
            box.classList = "box";

            var figure = document.createElement('figure');
            figure.setAttribute("itemprop", "associatedMedia");
            figure.setAttribute("itemscope", "");
            figure.setAttribute("itemtype", "http://schema.org/ImageObject");

            var div = document.createElement('div');
            div.classList = "img";
            div.setAttribute("style", "background-image: url('" + file.thumbnailLink + "')");

            var img = document.createElement('img');
            img.setAttribute("src", file.thumbnailLink);
            img.setAttribute("imageprop", "thumbnail");

            var figcaption = document.createElement('figcaption');
            var p = document.createElement('p');
            var a = document.createElement('a');
            a.setAttribute("itemprop", "contentUrl");
            a.setAttribute("href", file.webContentLink);

            //img.src = file.webContentLink;
            //img.src = file.thumbnailLink;
            //img.alt = file.name;
            div.appendChild(img);
            figcaption.appendChild(p);

            figure.appendChild(div);
            figure.appendChild(figcaption);
            figure.appendChild(a);

            box.appendChild(figure);

            container.appendChild(box);
        }
    });
});
