document.addEventListener('alpine:init', () => {
  Alpine.store('darkMode', {
    on: false,
  });

  Alpine.data('dropdown', () => ({
    open: false,

    toggle() {
      this.open = !this.open;
    },
  }));

  Alpine.bind('SomeButton', () => ({
    type: 'button',

    ':class'() {
      return 'bg-blue-800 text-white px-2 py-1 rounded-xl';
    },

    '@click'() {
      console.log('BBBB');
    },
  }));
});
