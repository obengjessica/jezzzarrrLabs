import { useEffect, useRef, useState } from 'react'
import { AudioLines, Music2, Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { musicTracks } from '../data/music.js'

const clipDurationSeconds = 60

function shuffledTrackOrder() {
  const introIndex = musicTracks.findIndex((track) => track.title === 'B4 B4')
  const order = musicTracks.map((_, index) => index).filter((index) => index !== introIndex)
  for (let index = order.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = order[index]
    order[index] = order[randomIndex]
    order[randomIndex] = current
  }
  return [introIndex, ...order]
}

export function AutoMusic() {
  const audioRef = useRef(null)
  const lastAdvancedPosition = useRef(null)
  const [trackOrder] = useState(shuffledTrackOrder)
  const [trackPosition, setTrackPosition] = useState(0)
  const trackPositionRef = useRef(trackPosition)
  const [playing, setPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    trackPositionRef.current = trackPosition
  }, [trackPosition])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.38
    audio.play()
      .then(() => {
        setPlaying(true)
        setNeedsTap(false)
      })
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          setNeedsTap(true)
          return
        }
        console.error('Could not start the music playlist:', error)
      })
  }, [])

  useEffect(() => {
    function startIntroTrack() {
      const audio = audioRef.current
      if (!audio) return
      if (trackPositionRef.current !== 0) {
        setTrackPosition(0)
        audio.src = musicTracks[trackOrder[0]].src
        audio.load()
      }
      audio.play()
        .then(() => {
          setPlaying(true)
          setNeedsTap(false)
        })
        .catch((error) => {
          if (error.name === 'NotAllowedError') setNeedsTap(true)
          else console.error('Could not play the opening track:', error)
        })
    }

    window.addEventListener('jezzzarrr:play-opening-track', startIntroTrack)
    return () => window.removeEventListener('jezzzarrr:play-opening-track', startIntroTrack)
  }, [trackOrder])

  function playAudio() {
    const audio = audioRef.current
    if (!audio) return
    audio.play()
      .then(() => {
        setPlaying(true)
        setNeedsTap(false)
      })
      .catch((error) => {
        console.error('Could not play the music track:', error)
        setNeedsTap(true)
      })
  }

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      playAudio()
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  function playNextTrack() {
    lastAdvancedPosition.current = trackPosition
    setTrackPosition((position) => (position + 1) % trackOrder.length)
  }

  function handleTrackEnded() {
    if (lastAdvancedPosition.current !== trackPosition) playNextTrack()
  }

  function handleTrackProgress() {
    const audio = audioRef.current
    if (!audio || audio.currentTime < clipDurationSeconds || lastAdvancedPosition.current === trackPosition) return
    playNextTrack()
  }

  useEffect(() => {
    lastAdvancedPosition.current = null
    if (!playing) return

    audioRef.current?.play()
      .then(() => setNeedsTap(false))
      .catch((error) => {
        if (error.name === 'NotAllowedError') setNeedsTap(true)
        else console.error('Could not play the next music track:', error)
      })
  }, [trackPosition, playing])

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  const track = musicTracks[trackOrder[trackPosition]]

  return <div className="music-dock" aria-label="Site music player">
    <audio ref={audioRef} src={track.src} onEnded={handleTrackEnded} onTimeUpdate={handleTrackProgress} preload="auto" />
    <span className={`music-dock-art${playing ? ' is-playing' : ''}`} aria-hidden="true"><AudioLines size={18} /></span>
    <div className="music-dock-track">
      <strong>{needsTap ? 'Soundtrack' : track.title}</strong>
      <span>{needsTap ? 'Tap play to start music' : track.artist}</span>
    </div>
    <button type="button" className="music-dock-button" onClick={togglePlayback} aria-label={playing ? 'Pause music' : 'Play music'}>
      {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
    </button>
    <button type="button" className="music-dock-button music-dock-secondary" onClick={playNextTrack} aria-label="Play next song"><SkipForward size={16} /></button>
    <button type="button" className="music-dock-button music-dock-secondary" onClick={toggleMute} aria-label={muted ? 'Unmute music' : 'Mute music'}>
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
    <Music2 className="music-dock-note" size={14} aria-hidden="true" />
  </div>
}
