---
layout: default
permalink: /labs/
---

Throughout the labs, you will ge guided to develop a web application called *Microblog* that allows users to share short messages.

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Date</div>
	<div class="topic">Labs</div>
    <div class="notes">Handout</div>
</div>

{% assign week_id = 0 %}
{% for e in site.data.labs %}
<div class="week {% cycle "odd", "even" %}">
    {% if e.break %}
    <div class="week_id"></div>
    <div class="date"></div>
	<div class="topic">{{e.break}}</div>
    {% else %}
    {% assign week_id = week_id | plus: 1 %}
    <div class="week_id">{{week_id}}</div>
    <div class="date"></div>
	<div class="topic">{{e.lab}}</div>
    {% if e.handout %}
    <div class="notes"><a href="{{e.handout}}">handout</a></div>
    {% endif %}
    {% endif %}
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule("20170102",7,0);
</script>
   

