export function useScrollTop() {
  const layout = ref();
  onMounted(() => {
    layout.value = document.getElementById('layout-content');
  });
  function scrollTop() {
    layout.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return { scrollTop };
}
