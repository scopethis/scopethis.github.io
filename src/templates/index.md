---
layout: page.njk
---

<ul class="latest-work">
{% for work in collections.work %}
  <li class="latest-work-entry">
    {{ work.template.frontMatter.content | safe }}
  </li>
{% endfor %}
</ul>