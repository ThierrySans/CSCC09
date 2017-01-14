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

{% for e in site.data.labs %}
<div class="week {% cycle "odd", "even" %}">
    <div class="week_id">{{forloop.index}}</div>
    <div class="date"></div>
	<div class="topic">{{e.lab}}</div>
    {% if e.handout %}
    <div class="notes"><a href="{{forloop.index}}/">handout</a></div>
    {% endif %}
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule("20170102",7,0);
</script>
   

