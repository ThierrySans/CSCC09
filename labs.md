---
layout: default
permalink: /labs/
---

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Date</div>
	<div class="lab">Labs</div>
</div>

{% for e in site.data.labs %}
<div class="week {% cycle "odd", "even" %}">
    <div class="week_id">{{forloop.index}}</div>
    <div class="date"></div>
	<div class="lab">{{e.lab}}</div>
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule("20170102",7,0);
</script>
   

