---
layout: default
permalink: /work/
---

<div class="week hrow">
    <div class="week_id">Week</div>
	<div class="lab">Labs</div>
    <div class="hw">Assignments</div>
    <div class="project">Project</div>
    <div class="date">Deadline (11:59pm)</div>
</div>

{% for e in site.data.work %}
<div class="week {% cycle "odd", "even" %}">
    <div class="week_id">{{forloop.index}}</div>
	<div class="lab">{{e.lab}}</div>
    <div class="lab">{{e.hw}}</div>
    <div class="lab">{{e.project}}</div>
    <div class="date"></div>
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule("20170102",7,6);
</script>
   

