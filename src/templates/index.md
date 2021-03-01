---
layout: page.njk
# When using pagination, remember that
# the size refers to the number of items on 
# each page so, "size: 1" means each entry has a page,
# "size: 10" means 10 items per page
pagination:
    data: collections.posts
    size: 10
---

<ul class="latest-posts">
{% for post in pagination.items %}
  <li class="latest-posts-article">
    {% include "partials/post-snippet.njk" %}
  </li>
{% endfor %}
</ul>