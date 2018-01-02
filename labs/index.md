---
layout: default
permalink: /labs/
---

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Date</div>
	<div class="topic">Lab</div>
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
	<div class="topic">{{e.week}}</div>
    <div class="notes">
        {% for note in e.notes %}
            {% for pair in note %}
                {% if pair[1] == nil %}
                    <li>{{note}}</li>
                {% else %}
                    <li><a href="{{pair[1]}}">{{pair[0]}}</a></li>
                {% endif %}
            {% endfor %}
		{% endfor %}
    </div>
    {% endif %}
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule({{site.data.settings.first}},7,0);
</script>
   

