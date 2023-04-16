export const mainPage = {
    async get (id, host){
        return `
        <html>
<head>
    <title>Video stream sample</title>
</head>
<body>
<div style="max-height: min-content" style="max-width: none">
<video id="videoPlayer" controls muted="muted" autoplay>
    <source src="http://${host}/video/stream/${id}" type="video/mp4">
</video>
</div>
</body>
</html>
        `
    }
}