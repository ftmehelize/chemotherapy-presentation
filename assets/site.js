const videos = {
  nutrition: {
    route: 'nutrition',
    id: 'f07i44t',
    title: 'نکات تغذیه و آشپزی در دوران شیمی‌درمانی',
    next: 'side-effects'
  },
  'side-effects': {
    route: 'side-effects',
    id: 's466jdp',
    title: 'عوارض شیمی‌درمانی',
    next: 'nutrition'
  }
};

const siteTitle = document.title;
const home = document.querySelector('#home');
const videoPage = document.querySelector('#video-page');
const videoTitle = document.querySelector('#video-title');
const player = document.querySelector('#player');
const otherVideo = document.querySelector('#other-video');
let currentVideo;

function showRoute() {
  const route = location.hash.slice(1);
  const video = Object.hasOwn(videos, route) ? videos[route] : null;
  if (video === currentVideo) return;

  const previous = currentVideo;
  currentVideo = video;
  player.replaceChildren();
  home.hidden = Boolean(video);
  videoPage.hidden = !video;

  if (!video) {
    document.title = siteTitle;
    if (previous) {
      const card = home.querySelector('a[href="#' + previous.route + '"]');
      card?.focus({ preventScroll: true });
    }
    return;
  }

  document.title = video.title + ' | ' + siteTitle;
  videoTitle.textContent = video.title;
  otherVideo.href = '#' + video.next;
  otherVideo.textContent = 'ویدئوی دیگر ←';

  const frame = document.createElement('iframe');
  frame.title = video.title;
  frame.src = 'https://www.aparat.com/video/video/embed/videohash/' + video.id + '/vt/frame?autoplay=true';
  frame.allow = 'autoplay; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  player.append(frame);
  window.scrollTo(0, 0);
  videoTitle.focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('.card, #other-video, .back');
  if (!link) return;
  event.preventDefault();
  if (link.href !== location.href) history.pushState(null, '', link.href);
  showRoute();
});

window.addEventListener('popstate', showRoute);
window.addEventListener('hashchange', showRoute);
showRoute();
