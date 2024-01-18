<script>
  import { onMount } from 'svelte';


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMount(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollButton = document.getElementById('scrollToTopBtn');
    const bodyHeight = document.body.offsetHeight;
    const scrollThreshold = (3 / 4) * bodyHeight;

    if (scrollButton) {
      scrollButton.style.display = window.scrollY > scrollThreshold ? 'block' : 'none';
    }
  };
</script>

<style>
  #scrollToTopBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 var(--cardShadow);
  }
</style>

<button class="btn" id="scrollToTopBtn" on:click={scrollToTop}>
  <i class="bi bi-arrow-up"></i>
</button>