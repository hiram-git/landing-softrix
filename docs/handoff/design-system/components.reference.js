/* @ds-bundle: {"format":4,"namespace":"Softrix","components":[{"name":"Button"},{"name":"Badge"},{"name":"ProductCard"},{"name":"Input"},{"name":"FeatureCard"},{"name":"Navbar"},{"name":"Hero"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }

  var icons = {
    arrow: h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: 'M5 12h14M13 6l6 6-6 6' })),
    alert: h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 8v4M12 16h.01' })),
    check: h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: 'M5 12l4 4L19 7' })),
    chevron: h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: 'M6 9l6 6 6-6' })),
    chat: h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z' }))
  };

  function Button(props) {
    var variant = props.variant || 'primary';
    var Tag = props.href ? 'a' : 'button';
    var extra = props.href ? { href: props.href } : { type: props.type || 'button', disabled: props.disabled };
    return h(Tag, Object.assign({
      className: cx('sx-btn', 'sx-btn--' + variant, props.size === 'lg' && 'sx-btn--lg', props.className),
      onClick: props.onClick
    }, extra),
      variant === 'whatsapp' && icons.chat,
      props.children,
      props.arrow && icons.arrow);
  }

  function Badge(props) {
    var tone = props.tone || 'neutral';
    return h('span', { className: cx('sx-badge', 'sx-badge--' + tone, props.pill && 'sx-badge--pill', props.className) },
      props.icon === 'check' && icons.check,
      props.icon === 'alert' && icons.alert,
      props.children);
  }

  function ProductCard(props) {
    var features = props.features || [];
    return h('article', { className: cx('sx-card', props.featured && 'sx-card--featured', props.className) },
      props.icon && h('div', { className: 'sx-card__icon', 'aria-hidden': 'true' }, props.icon),
      props.eyebrow && h('div', { className: 'sx-card__eyebrow' }, props.eyebrow),
      h('h3', { className: 'sx-card__title' }, props.title),
      props.pitch && h('p', { className: 'sx-card__pitch' }, props.pitch),
      features.length > 0 && h('ul', { className: 'sx-card__list' }, features.map(function (f, i) { return h('li', { key: i }, f); })),
      h('div', { className: 'sx-card__footer' },
        h(Button, { variant: 'ghost', href: props.href || '#', arrow: true }, props.cta || 'Ver producto'),
        props.badge && h(Badge, { tone: props.badgeTone || 'info' }, props.badge)));
  }

  function Input(props) {
    var id = props.id || ('sx-' + (props.name || 'field'));
    var Tag = props.multiline ? 'textarea' : 'input';
    var described = props.error ? id + '-err' : (props.hint ? id + '-hint' : undefined);
    return h('div', { className: cx('sx-field', props.error && 'sx-field--error', props.className) },
      props.label && h('label', { className: 'sx-field__label', htmlFor: id }, props.label, props.optional && h('small', null, ' (opcional)')),
      h(Tag, {
        id: id, name: props.name, type: props.multiline ? undefined : (props.type || 'text'),
        className: props.multiline ? 'sx-textarea' : 'sx-input',
        placeholder: props.placeholder, value: props.value, defaultValue: props.defaultValue,
        onChange: props.onChange, disabled: props.disabled, required: props.required,
        'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': described
      }),
      props.error
        ? h('div', { className: 'sx-field__error', id: id + '-err' }, icons.alert, props.error)
        : props.hint && h('div', { className: 'sx-field__hint', id: id + '-hint' }, props.hint));
  }

  function FeatureCard(props) {
    var items = props.items || [];
    return h('article', { className: cx('sx-feature', props.className) },
      props.icon && h('div', { className: 'sx-feature__icon', 'aria-hidden': 'true' }, props.icon),
      props.badge && h('div', null, h(Badge, { tone: props.badgeTone || 'neutral' }, props.badge)),
      h('h3', { className: 'sx-feature__title' }, props.title),
      props.children && h('p', { className: 'sx-feature__body' }, props.children),
      items.length > 0 && h('ul', { className: 'sx-feature__list' }, items.map(function (it, i) { return h('li', { key: i }, it); })));
  }

  function Navbar(props) {
    var links = props.links || [];
    return h('nav', { className: cx('sx-nav', props.sticky && 'sx-nav--sticky', props.className), 'aria-label': 'Principal' },
      h('a', { className: 'sx-nav__logo', href: props.homeHref || '/' }, h('img', { src: props.logoSrc, alt: props.logoAlt || 'RCG Softrix' })),
      h('ul', { className: 'sx-nav__links' }, links.map(function (l, i) {
        if (l.children && l.children.length) {
          return h('li', { key: i, className: 'sx-nav__item' },
            h('button', { type: 'button', className: 'sx-nav__link', 'aria-haspopup': 'true', 'aria-current': l.current ? 'page' : undefined }, l.label, icons.chevron),
            h('ul', { className: 'sx-nav__menu' }, l.children.map(function (c, j) {
              return h('li', { key: j }, h('a', { href: c.href, 'aria-current': c.current ? 'page' : undefined }, c.label, c.hint && h('small', null, c.hint)));
            })));
        }
        return h('li', { key: i, className: 'sx-nav__item' }, h('a', { className: 'sx-nav__link', href: l.href, 'aria-current': l.current ? 'page' : undefined }, l.label));
      })),
      h('div', { className: 'sx-nav__actions' },
        props.secondary && h(Button, { variant: 'secondary', href: props.secondary.href }, props.secondary.label),
        props.primary && h(Button, { variant: 'primary', href: props.primary.href }, props.primary.label)));
  }

  function Hero(props) {
    return h('section', { className: cx('sx-hero', props.dark && 'sx-hero--dark', props.className) },
      h('div', { className: 'sx-hero__inner' },
        h('div', { className: 'sx-hero__text' },
          props.badges && props.badges.length > 0 && h('div', { className: 'sx-hero__badges' }, props.badges.map(function (b, i) { return h(Badge, { key: i, tone: b.tone || 'neutral' }, b.label); })),
          props.eyebrow && h('div', { className: 'sx-hero__eyebrow' }, props.eyebrow),
          h('h1', { className: 'sx-hero__title' }, props.title),
          props.lead && h('p', { className: 'sx-hero__lead' }, props.lead),
          h('div', { className: 'sx-hero__actions' },
            props.primary && h(Button, { variant: 'primary', size: 'lg', href: props.primary.href, arrow: true }, props.primary.label),
            props.secondary && h(Button, { variant: props.dark ? 'secondary-inverse' : (props.secondaryVariant || 'ghost'), size: 'lg', href: props.secondary.href }, props.secondary.label)),
          props.note && h('div', { className: 'sx-hero__note' }, props.note)),
        props.children && h('div', { className: 'sx-hero__aside' }, props.children)));
  }

  window.Softrix = { Button: Button, Badge: Badge, ProductCard: ProductCard, Input: Input, FeatureCard: FeatureCard, Navbar: Navbar, Hero: Hero, icons: icons };
})();
