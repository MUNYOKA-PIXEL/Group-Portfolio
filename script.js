document.body.classList.add('js-ready');

const rotatingMessages = [
    {
        heading: 'AI for smarter decisions',
        text: 'Building ideas that connect data, people, and opportunity.'
    },
    {
        heading: 'Automation that saves time',
        text: 'Designing efficient systems that reduce manual work and improve flow.'
    },
    {
        heading: 'Strategy with real impact',
        text: 'Blending business thinking with modern technology for meaningful results.'
    }
];

const heading = document.getElementById('dynamic-heading');
const text = document.getElementById('dynamic-text');
const year = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const viewLinks = document.querySelectorAll('a[href^="#"]');
const pageViews = document.querySelectorAll('.page-view');

if (year) {
    year.textContent = new Date().getFullYear();
}

const showView = (viewId, updateHash = true) => {
    const targetView = document.getElementById(viewId);

    if (!targetView || !targetView.classList.contains('page-view')) {
        return;
    }

    pageViews.forEach((view) => {
        view.classList.toggle('active-view', view.id === viewId);
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${viewId}`);
    });

    targetView.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('visible');
    });

    if (updateHash) {
        window.location.hash = viewId;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

viewLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');

        if (!href || !href.startsWith('#')) {
            return;
        }

        const targetId = href.slice(1);
        const targetView = document.getElementById(targetId);

        if (!targetView || !targetView.classList.contains('page-view')) {
            return;
        }

        event.preventDefault();
        showView(targetId);
    });
});

if (heading && text) {
    let index = 0;

    setInterval(() => {
        index = (index + 1) % rotatingMessages.length;
        heading.textContent = rotatingMessages[index].heading;
        text.textContent = rotatingMessages[index].text;
    }, 3200);
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

const initialView = window.location.hash.replace('#', '') || 'home';
showView(initialView, false);

window.addEventListener('hashchange', () => {
    const nextView = window.location.hash.replace('#', '') || 'home';
    showView(nextView, false);
});

console.log('Single-file GroupAlpha view switching is active.');