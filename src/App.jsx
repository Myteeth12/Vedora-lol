import { useEffect, useRef, useState } from 'react';
import './App.css';
import './components/loading.css';
import { Application } from './components/appIco.jsx';
import useSound from 'use-sound'; // install it: 'npm install use-sound'

import startup from './assets/vedora.mp3';
let done_ = true;
let loadDone = false;
var randomLoading = Math.random() * (4000 - 1500) + 1500;

function App() {
  const [startSfx] = useSound(startup);
  const [navigate, setNavigate] = useState('home');
  const [winHeight, setWinH] = useState({ height: '4rem' });
  const [scrollbar, setScroll] = useState({ overflowY: 'hidden' });
  const [loadingScreen, setYLoading] = useState({ transform: 'translateY(0%)' });
  const [loadCircleOpacity, setLoadOpacity] = useState({ opacity: 1 });
  const instructOpacity = useRef(0);

  const startVedora = () => {
    setYLoading({ transform: 'translateY(-100%)' });
    startSfx();
  };

  const navigateChange = (tab) => {
    if (done_) {
      setNavigate(tab);
    }
    if (tab == 'home' && done_) {
      setWinH({ height: '4rem' });
      setScroll({ overflowY: 'hidden' });
    } else if (done_) {
      done_ = false;
      setWinH({ height: '90%' });
      setTimeout(() => {
        setScroll({ overflowY: 'auto' })
        done_ = true;
      }, 530)
    }
  }

  if (!loadDone) {
    setTimeout(() => {
      setLoadOpacity({ opacity: 0 });
      loadDone = true;
    }, randomLoading)
  }

  useEffect(() => {
    if (loadCircleOpacity.opacity == 1){
      instructOpacity.current.style.opacity = 0;
    } else {
      instructOpacity.current.style.opacity = 1;
    }
  }, [loadCircleOpacity]);

  return (
    <>
      <div className='background'></div>
      <div className='taskbar'>
        <Application icon='./src/assets/icons/home.svg' clicked={() => navigateChange('home')} />
        <Application icon='./src/assets/icons/info.svg' clicked={() => navigateChange('intro')} appName='Info' />
        <Application icon='./src/assets/icons/faq.svg' clicked={() => navigateChange('faq')} appName='FAQ' />
      </div>
      <div className='vedora-window' style={{ ...winHeight, ...scrollbar }}>
        {navigate == 'home' && <GoogleSearch />}
        {navigate == 'intro' && <IntroTab />}
        {navigate == 'faq' && <Faq />}
      </div>
      <div className='start-up' style={loadingScreen} onClick={() => loadDone && startVedora()}>
        <img src='./src/assets/logo-vedora.svg' className='vedora-logo'></img>
        <div className='loading-screen' style={loadCircleOpacity}>V</div>
        <div className='continue-instruct' ref={instructOpacity}>Click to start</div>
      </div>
    </>
  )
}

class Yaps extends HTMLElement {
  constructor() {
    super();
  }
}

class YapTitle extends HTMLElement {
  constructor() {
    super();
  }
}

class YapList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let innerTxt = this.innerHTML;
    this.innerHTML = `&#x2022; ${innerTxt}`;
  }
}

class Smoll extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('yap-txt', Yaps);
customElements.define('yap-title', YapTitle);
customElements.define('yap-list', YapList);
customElements.define('smol-t', Smoll);

//Navigation sites
function GoogleSearch() {
  let searchLabel = ['🔍', '⚫'];
  const [searched, setSearch] = useState('')
  const [btnVal, setBtn] = useState(searchLabel[0]);
  const [visitLnk, setLink] = useState(false);

  useEffect(() => {
    if (searched.trim() == '') {
      setBtn(searchLabel[1])
    } else {
      setBtn(searchLabel[0])
    }
  }, [searched])

  useEffect(() => {
    if (searched.trim() == '') {
      setBtn(searchLabel[1])
    } else if (searched.length > 1) {
      setLink(true);
    } else {
      setBtn(searchLabel[0]);
    }
  }, [btnVal])

  useEffect(() => {
    if (visitLnk) {
      setLink(false);
      window.open(`https://www.google.com/search?q=${searched}`);
      setSearch('');
    }
  }, [visitLnk])

  return (
    <div className='search'>
      <img src='./src/assets/icons/google.svg' className='google-icon'></img>
      <input value={searched} onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => e.key == 'Enter' && setBtn(' ')} className='search-box'></input>
      <button className='search-button' onClick={() => setBtn(' ')}>{btnVal}</button>
    </div>
  )
}

function IntroTab() {
  return (
    <div>
      <yap-title>Put something here lolz</yap-title> <br />
      <yap-txt>If you would like to contact me:
        <br /><br />
        shrekgeneral@gmail.com
      </yap-txt>
    </div>
  )
}

function Faq(){
  return (
    <div>
      <yap-title>FAQ's</yap-title>
      <smol-t>(Frequently Ask Questions)</smol-t><br /><br />
      <yap-list>Yes question 1?</yap-list><br />
      <smol-t>No answer 1.</smol-t><br /><br />
      <yap-list>Yes question 2?</yap-list><br />
      <smol-t>No answer 2.</smol-t><br /><br />
    </div>
  )
}

export default App
