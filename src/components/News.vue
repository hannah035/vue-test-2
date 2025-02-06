<script setup> 
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'News'
  },
  subtitle: {
    type: String,
    default: 'Contents'
  },
});
</script>

<template>
    <section>
        <h1>
        {{ props.title }}
    </h1>

    <p>
        {{ props.subtitle }}
    </p>
    </section>
</template>

<style scoped>
    h1 {
        font-size: 2rem;
        /* rem:times root font size*/
        font-family: "JetBrains Mono";
        color: white;
    }
    p {
        font-size: 1rem;
        /* rem:times root font size*/
        font-family: "JetBrains Mono";
        color: white;
    }
</style>