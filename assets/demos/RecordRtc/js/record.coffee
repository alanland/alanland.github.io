recordingDIV = document.querySelector('.recordrtc')
recordingMedia = recordingDIV.querySelector('.recording-media')
recordingPlayer = recordingDIV.querySelector('video')
mediaContainerFormat = recordingDIV.querySelector('.media-container-format')

captureVideo = (config) ->
    captureUserMedia { video: true }, ((videoStream) ->
        recordingPlayer.srcObject = videoStream
        recordingPlayer.play()
        config.onMediaCaptured videoStream

        videoStream.onended = ->
            config.onMediaStopped()
            return

        return
    ), (error) ->
        config.onMediaCapturingFailed error
        return
    return

captureAudio = (config) ->
    captureUserMedia { audio: true }, ((audioStream) ->
        recordingPlayer.srcObject = audioStream
        recordingPlayer.play()
        config.onMediaCaptured audioStream

        audioStream.onended = ->
            config.onMediaStopped()
            return

        return
    ), (error) ->
        config.onMediaCapturingFailed error
        return
    return

captureAudioPlusVideo = (config) ->
    captureUserMedia {
        video: true
        audio: true
    }, ((audioVideoStream) ->
        recordingPlayer.srcObject = audioVideoStream
        recordingPlayer.play()
        config.onMediaCaptured audioVideoStream

        audioVideoStream.onended = ->
            config.onMediaStopped()
            return

        return
    ), (error) ->
        config.onMediaCapturingFailed error
        return
    return

captureScreen = (config) ->
    getScreenId (error, sourceId, screenConstraints) ->
        if error == 'not-installed'
            document.write '<h1><a target="_blank" href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk">Please install this chrome extension then reload the page.</a></h1>'
        if error == 'permission-denied'
            alert 'Screen capturing permission is denied.'
        if error == 'installed-disabled'
            alert 'Please enable chrome screen capturing extension.'
        if error
            config.onMediaCapturingFailed error
            return
        captureUserMedia screenConstraints, ((screenStream) ->
            recordingPlayer.srcObject = screenStream
            recordingPlayer.play()
            config.onMediaCaptured screenStream

            screenStream.onended = ->
                config.onMediaStopped()
                return

            return
        ), (error) ->
            config.onMediaCapturingFailed error
            return
        return
    return

captureAudioPlusScreen = (config) ->
    getScreenId (error, sourceId, screenConstraints) ->
        if error == 'not-installed'
            document.write '<h1><a target="_blank" href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk">Please install this chrome extension then reload the page.</a></h1>'
        if error == 'permission-denied'
            alert 'Screen capturing permission is denied.'
        if error == 'installed-disabled'
            alert 'Please enable chrome screen capturing extension.'
        if error
            config.onMediaCapturingFailed error
            return
        screenConstraints.audio = true
        captureUserMedia screenConstraints, ((screenStream) ->
            recordingPlayer.srcObject = screenStream
            recordingPlayer.play()
            config.onMediaCaptured screenStream

            screenStream.onended = ->
                config.onMediaStopped()
                return

            return
        ), (error) ->
            config.onMediaCapturingFailed error
            return
        return
    return

captureUserMedia = (mediaConstraints, successCallback, errorCallback) ->
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch errorCallback
    return

setMediaContainerFormat = (arrayOfOptionsSupported) ->
    options = Array::slice.call(mediaContainerFormat.querySelectorAll('option'))
    selectedItem = undefined
    options.forEach (option) ->
        option.disabled = true
        if arrayOfOptionsSupported.indexOf(option.value) != -1
            option.disabled = false
            if !selectedItem
                option.selected = true
                selectedItem = option
        return
    return

saveToDiskOrOpenNewTab = (recordRTC) ->
    recordingDIV.querySelector('#save-to-disk').parentNode.style.display = 'block'

    recordingDIV.querySelector('#save-to-disk').onclick = ->
        if !recordRTC
            return alert('No recording found.')
        recordRTC.save()
        return

    recordingDIV.querySelector('#open-new-tab').onclick = ->
        if !recordRTC
            return alert('No recording found.')
        window.open recordRTC.toURL()
        return

    recordingDIV.querySelector('#upload-to-server').disabled = false

    recordingDIV.querySelector('#upload-to-server').onclick = ->
        if !recordRTC
            return alert('No recording found.')
        @disabled = true
        button = this
        uploadToServer recordRTC, (progress, fileURL) ->
            if progress == 'ended'
                button.disabled = false
                button.innerHTML = 'Click to download from server'

                button.onclick = ->
                    window.open fileURL
                    return

                return
            button.innerHTML = progress
            return
        return

    return

uploadToServer = (recordRTC, callback) ->
    blob = if recordRTC instanceof Blob then recordRTC else recordRTC.blob
    fileType = blob.type.split('/')[0] or 'audio'
    fileName = (Math.random() * 1000).toString().replace('.', '')
    if fileType == 'audio'
        fileName += '.' + (if ! !navigator.mozGetUserMedia then 'ogg' else 'wav')
    else
        fileName += '.webm'
    # create FormData
    formData = new FormData
    formData.append fileType + '-filename', fileName
    formData.append fileType + '-blob', blob
    callback 'Uploading ' + fileType + ' recording to server.'
    makeXMLHttpRequest 'save.php', formData, (progress) ->
        if progress != 'upload-ended'
            callback progress
            return
        initialURL = location.href.replace(location.href.split('/').pop(), '') + 'uploads/'
        callback 'ended', initialURL + fileName
        # to make sure we can delete as soon as visitor leaves
        listOfFilesUploaded.push initialURL + fileName
        return
    return

makeXMLHttpRequest = (url, data, callback) ->
    request = new XMLHttpRequest

    request.onreadystatechange = ->
        if request.readyState == 4 and request.status == 200
            callback 'upload-ended'
        return

    request.upload.onloadstart = ->
        callback 'Upload started...'
        return

    request.upload.onprogress = (event) ->
        callback 'Upload Progress ' + Math.round(event.loaded / event.total * 100) + '%'
        return

    request.upload.onload = ->
        callback 'progress-about-to-end'
        return

    request.upload.onload = ->
        callback 'progress-ended'
        return

    request.upload.onerror = (error) ->
        callback 'Failed to upload to server'
        console.error 'XMLHttpRequest failed', error
        return

    request.upload.onabort = (error) ->
        callback 'Upload aborted.'
        console.error 'XMLHttpRequest aborted', error
        return

    request.open 'POST', url
    request.send data
    return

recordingDIV.querySelector('button').onclick = ->
    button = this

    stopStream = ->
        if button.stream and button.stream.stop
            button.stream.stop()
            button.stream = null
        return

    if button.innerHTML == 'Stop Recording'
        button.disabled = true
        button.disableStateWaiting = true
        setTimeout (->
            button.disabled = false
            button.disableStateWaiting = false
            return
        ), 2 * 1000
        button.innerHTML = 'Star Recording'
        if button.recordRTC
            if button.recordRTC.length
                button.recordRTC[0].stopRecording (url) ->
                    if !button.recordRTC[1]
                        button.recordingEndedCallback url
                        stopStream()
                        saveToDiskOrOpenNewTab button.recordRTC[0]
                        return
                    button.recordRTC[1].stopRecording (url) ->
                        button.recordingEndedCallback url
                        stopStream()
                        return
                    return
            else
                button.recordRTC.stopRecording (url) ->
                    button.recordingEndedCallback url
                    stopStream()
                    saveToDiskOrOpenNewTab button.recordRTC
                    button.recordRTC.save()
                    return
        return
    button.disabled = true
    commonConfig =
        onMediaCaptured: (stream) ->
            button.stream = stream
            if button.mediaCapturedCallback
                button.mediaCapturedCallback()
            button.innerHTML = 'Stop Recording'
            button.disabled = false
            return
        onMediaStopped: ->
            button.innerHTML = 'Start Recording'
            if !button.disableStateWaiting
                button.disabled = false
            return
        onMediaCapturingFailed: (error) ->
            if error.name == 'PermissionDeniedError' and ! !navigator.mozGetUserMedia
                InstallTrigger.install 'Foo':
                    URL: 'https://addons.mozilla.org/en-US/firefox/addon/enable-screen-capturing/'
                    toString: ->
                        @URL
            commonConfig.onMediaStopped()
            return
    if recordingMedia.value == 'record-video'
        captureVideo commonConfig

        button.mediaCapturedCallback = ->
            button.recordRTC = RecordRTC(button.stream,
                type: if mediaContainerFormat.value == 'Gif' then 'gif' else 'video'
                disableLogs: params.disableLogs or false
                canvas:
                    width: params.canvas_width or 320
                    height: params.canvas_height or 240
                frameInterval: if typeof params.frameInterval != 'undefined' then parseInt(params.frameInterval) else 20)

            button.recordingEndedCallback = (url) ->
                recordingPlayer.src = null
                recordingPlayer.srcObject = null
                if mediaContainerFormat.value == 'Gif'
                    recordingPlayer.pause()
                    recordingPlayer.poster = url

                    recordingPlayer.onended = ->
                        recordingPlayer.pause()
                        recordingPlayer.poster = URL.createObjectURL(button.recordRTC.blob)
                        return

                    return
                recordingPlayer.src = url
                recordingPlayer.play()

                recordingPlayer.onended = ->
                    recordingPlayer.pause()
                    recordingPlayer.src = URL.createObjectURL(button.recordRTC.blob)
                    return

                return

            button.recordRTC.startRecording()
            return

    if recordingMedia.value == 'record-audio'
        captureAudio commonConfig

        button.mediaCapturedCallback = ->
            button.recordRTC = RecordRTC(button.stream,
                type: 'audio'
                bufferSize: if typeof params.bufferSize == 'undefined' then 0 else parseInt(params.bufferSize)
                sampleRate: if typeof params.sampleRate == 'undefined' then 44100 else parseInt(params.sampleRate)
                leftChannel: params.leftChannel or false
                disableLogs: params.disableLogs or false
                recorderType: if webrtcDetectedBrowser == 'edge' then StereoAudioRecorder else null)

            button.recordingEndedCallback = (url) ->
                audio = new Audio
                audio.src = url
                audio.controls = true
                recordingPlayer.parentNode.appendChild document.createElement('hr')
                recordingPlayer.parentNode.appendChild audio
                if audio.paused
                    audio.play()

                audio.onended = ->
                    audio.pause()
                    audio.src = URL.createObjectURL(button.recordRTC.blob)
                    return

                return

            button.recordRTC.startRecording()
            return

    if recordingMedia.value == 'record-audio-plus-video'
        captureAudioPlusVideo commonConfig

        button.mediaCapturedCallback = ->
            if webrtcDetectedBrowser != 'firefox'
# opera or chrome etc.
                button.recordRTC = []
                if !params.bufferSize
# it fixes audio issues whilst recording 720p
                    params.bufferSize = 16384
                audioRecorder = RecordRTC(button.stream,
                    type: 'audio'
                    bufferSize: if typeof params.bufferSize == 'undefined' then 0 else parseInt(params.bufferSize)
                    sampleRate: if typeof params.sampleRate == 'undefined' then 44100 else parseInt(params.sampleRate)
                    leftChannel: params.leftChannel or false
                    disableLogs: params.disableLogs or false
                    recorderType: if webrtcDetectedBrowser == 'edge' then StereoAudioRecorder else null)
                videoRecorder = RecordRTC(button.stream,
                    type: 'video'
                    disableLogs: params.disableLogs or false
                    canvas:
                        width: params.canvas_width or 320
                        height: params.canvas_height or 240
                    frameInterval: if typeof params.frameInterval != 'undefined' then parseInt(params.frameInterval) else 20)
                # to sync audio/video playbacks in browser!
                videoRecorder.initRecorder ->
                    audioRecorder.initRecorder ->
                        audioRecorder.startRecording()
                        videoRecorder.startRecording()
                        return
                    return
                button.recordRTC.push audioRecorder, videoRecorder

                button.recordingEndedCallback = ->
                    audio = new Audio
                    audio.src = audioRecorder.toURL()
                    audio.controls = true
                    audio.autoplay = true

                    audio.onloadedmetadata = ->
                        recordingPlayer.src = videoRecorder.toURL()
                        recordingPlayer.play()
                        return

                    recordingPlayer.parentNode.appendChild document.createElement('hr')
                    recordingPlayer.parentNode.appendChild audio
                    if audio.paused
                        audio.play()
                    return

                return
            button.recordRTC = RecordRTC(button.stream,
                type: 'video'
                disableLogs: params.disableLogs or false)

            button.recordingEndedCallback = (url) ->
                recordingPlayer.srcObject = null
                recordingPlayer.muted = false
                recordingPlayer.src = url
                recordingPlayer.play()

                recordingPlayer.onended = ->
                    recordingPlayer.pause()
                    recordingPlayer.src = URL.createObjectURL(button.recordRTC.blob)
                    return

                return

            button.recordRTC.startRecording()
            return

    if recordingMedia.value == 'record-screen'
        captureScreen commonConfig

        button.mediaCapturedCallback = ->
            button.recordRTC = RecordRTC(button.stream,
                type: if mediaContainerFormat.value == 'Gif' then 'gif' else 'video'
                disableLogs: params.disableLogs or false
                canvas:
                    width: params.canvas_width or 320
                    height: params.canvas_height or 240)

            button.recordingEndedCallback = (url) ->
                recordingPlayer.src = null
                recordingPlayer.srcObject = null
                if mediaContainerFormat.value == 'Gif'
                    recordingPlayer.pause()
                    recordingPlayer.poster = url

                    recordingPlayer.onended = ->
                        recordingPlayer.pause()
                        recordingPlayer.poster = URL.createObjectURL(button.recordRTC.blob)
                        return

                    return
                recordingPlayer.src = url
                recordingPlayer.play()
                return

            button.recordRTC.startRecording()
            return

    if recordingMedia.value == 'record-audio-plus-screen'
        captureAudioPlusScreen commonConfig

        button.mediaCapturedCallback = ->
            button.recordRTC = RecordRTC(button.stream,
                type: 'video'
                disableLogs: params.disableLogs or false)

            button.recordingEndedCallback = (url) ->
                recordingPlayer.srcObject = null
                recordingPlayer.muted = false
                recordingPlayer.src = url
                recordingPlayer.play()

                recordingPlayer.onended = ->
                    recordingPlayer.pause()
                    recordingPlayer.src = URL.createObjectURL(button.recordRTC.blob)
                    return

                return

            button.recordRTC.startRecording()
            return

    return

recordingMedia.onchange = ->
    if @value == 'record-audio'
        setMediaContainerFormat [
            'WAV'
            'Ogg'
        ]
        return
    setMediaContainerFormat [
        'WebM'
        'Gif'
    ]
    return

if webrtcDetectedBrowser == 'edge'
# webp isn't supported in Microsoft Edge
# neither MediaRecorder API
# so lets disable both video/screen recording options
    console.warn 'Neither MediaRecorder API nor webp is supported in Microsoft Edge. You cam merely record audio.'
    recordingMedia.innerHTML = '<option value="record-audio">Audio</option>'
    setMediaContainerFormat [ 'WAV' ]
if webrtcDetectedBrowser == 'firefox'
# Firefox implemented both MediaRecorder API as well as WebAudio API
# Their MediaRecorder implementation supports both audio/video recording in single container format
# Remember, we can't currently pass bit-rates or frame-rates values over MediaRecorder API (their implementation lakes these features)
    recordingMedia.innerHTML = '<option value="record-audio-plus-video">Audio+Video</option>' + '<option value="record-audio-plus-screen">Audio+Screen</option>' + recordingMedia.innerHTML
# disabling this option because currently this demo
# doesn't supports publishing two blobs.
# todo: add support of uploading both WAV/WebM to server.
if false and webrtcDetectedBrowser == 'chrome'
    recordingMedia.innerHTML = '<option value="record-audio-plus-video">Audio+Video</option>' + recordingMedia.innerHTML
    console.info 'This RecordRTC demo merely tries to playback recorded audio/video sync inside the browser. It still generates two separate files (WAV/WebM).'
listOfFilesUploaded = []

window.onbeforeunload = ->
    recordingDIV.querySelector('button').disabled = false
    recordingMedia.disabled = false
    mediaContainerFormat.disabled = false
    if !listOfFilesUploaded.length
        return
    listOfFilesUploaded.forEach (fileURL) ->
        request = new XMLHttpRequest

        request.onreadystatechange = ->
            if request.readyState == 4 and request.status == 200
                if @responseText == ' problem deleting files.'
                    alert 'Failed to delete ' + fileURL + ' from the server.'
                    return
                listOfFilesUploaded = []
                alert 'You can leave now. Your files are removed from the server.'
            return

        request.open 'POST', 'delete.php'
        formData = new FormData
        formData.append 'delete-file', fileURL.split('/').pop()
        request.send formData
        return
    'Please wait few seconds before your recordings are deleted from the server.'
