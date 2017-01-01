---
layout: updates
permalink: /updates/
---

## Announcements

{% for post in site.posts %}
<div class="post">
    <div class="date">{{ post.date | date: '%b %-d' }}</div>
	<div class="title">{{ post.title }}</div>
    <div class="content">{{ post.content }}</div>
</div>
{% endfor %}