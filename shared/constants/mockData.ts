export const homeBlogSectionData = [
  {
    title: "Latest Blog",
    viewAllPath: "/blogs",
    blogs: [
      {
        id: 1,
        title: "Why software engineers are always learning new things",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        author: {
          name: "Emma Wilson",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        },
        date: "3 days ago",
      },
      {
        id: 2,
        title: "Clean code habits that every developer should build",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: {
          name: "Daniel Park",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        },
        date: "5 days ago",
      },
      {
        id: 3,
        title: "How writing blogs improved my software engineering career",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
        author: {
          name: "Sophia Nguyen",
          image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        },
        date: "1 week ago",
      },
    ],
  },

  {
    title: "Popular Blogs",
    viewAllPath: "/blogs/popular",
    blogs: [
      {
        id: 101,
        title: "Why software engineers are always learning new things",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        author: {
          name: "Emma Wilson",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        },
        date: "3 days ago",
      },
      {
        id: 102,
        title: "Clean code habits that every developer should build",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: {
          name: "Daniel Park",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        },
        date: "5 days ago",
      },
      {
        id: 103,
        title: "How writing blogs improved my software engineering career",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
        author: {
          name: "Sophia Nguyen",
          image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        },
        date: "1 week ago",
      },
    ],
  },

  {
    title: "Featured Stories",
    viewAllPath: "/blogs/featured",
    blogs: [
      {
        id: 201,
        title: "From junior to senior: lessons from my engineering journey",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        author: {
          name: "Michael Tan",
          image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
        },
        date: "4 days ago",
      },
      {
        id: 202,
        title: "What makes a great developer beyond technical skills",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        author: {
          name: "Linda Zhao",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        },
        date: "6 days ago",
      },
      {
        id: 203,
        title: "Balancing life and coding: avoiding burnout as an engineer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        author: {
          name: "Ryan Lee",
          image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
        },
        date: "1 week ago",
      },
    ],
  },

  {
    title: "Career & Learning",
    viewAllPath: "/blogs/career",
    blogs: [
      {
        id: 301,
        title: "How to build a strong career as a software engineer",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        author: {
          name: "Jason Kim",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        },
        date: "2 days ago",
      },
      {
        id: 302,
        title: "Learning strategies that actually work for developers",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        author: {
          name: "Rachel Adams",
          image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
        },
        date: "4 days ago",
      },
      {
        id: 303,
        title: "Why consistency beats talent in software engineering",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        author: {
          name: "Tom Hardy",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
        date: "6 days ago",
      },
    ],
  },
];


export const mockBlogData = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
     date: "2 days ago",
    htmlContent: `
      <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    <h1>Understanding JavaScript Closures</h1>
      <p>A closure allows a function to access variables from an outer scope even after the outer function has finished executing.</p>

      <pre><code class="language-js">
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
      </code></pre>

      <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8t8s6Rk9x3FhF38sZ4N2yA.png" alt="JavaScript Closure Diagram" />
    
      `,
  },
  {
    id: 2,
    title: "Vue 3 Composition API Basics",
    author: {
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "3 days ago",
    htmlContent: `
      <h1>Vue 3 Composition API Basics</h1>
      <p>The Composition API makes logic reuse and organization easier.</p>

      <pre><code class="language-ts">
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
};
      </code></pre>

      <img src="https://vuejs.org/assets/composition-api-after.8f0c1f3b.png" alt="Vue Composition API" />
    `,
  },
  {
    id: 3,
    title: "Nuxt 3 Server API Example",
    author: {
      name: "Alice Johnson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "4 days ago",   
    htmlContent: `
      <h1>Nuxt 3 Server API Example</h1>
      <p>Nuxt 3 provides a simple way to create backend APIs.</p>

      <pre><code class="language-ts">
export default defineEventHandler(() => {
  return {
    message: 'Hello from server API'
  };
});
      </code></pre>

      <img src="https://nuxt.com/assets/home/hero-dark.png" alt="Nuxt 3 Architecture" />
    `,
  },
  {
    id: 4,
    title: "CSS Flexbox Layout",
    author: {
      name: "Bob Brown",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "5 days ago",
    htmlContent: `
      <h1>CSS Flexbox Layout</h1>
      <p>Flexbox is a one-dimensional layout method for arranging items.</p>

      <pre><code class="language-css">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
      </code></pre>

      <img src="https://css-tricks.com/wp-content/uploads/2018/10/01-container.svg" alt="CSS Flexbox Diagram" />
    `,
  },
];


export const mockRelatedBlogData = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "2 days ago",
   
  },
  {
    id: 2,
    title: "Vue 3 Composition API Basics",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    author: {
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "3 days ago",
   
  },
  {
    id: 3,
    title: "Nuxt 3 Server API Example",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    author: {
      name: "Alice Johnson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "4 days ago",   
   
  },
  {
    id: 4,
    title: "CSS Flexbox Layout",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    author: {
      name: "Bob Brown",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    date: "5 days ago",
  },
];
    