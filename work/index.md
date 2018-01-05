---
layout: default
permalink: /work/
---

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Deadline (11:59pm)</div>
    <div class="lab">Labs</div>
    <div class="hw">Assignments</div>
    <div class="project">Project</div>
</div>

{% assign week_id = 0 %}
{% for e in site.data.work %}
<div class="week {% cycle "odd", "even" %}">
    {% if e.break %}
        <div class="week_id"></div>
    {% else %}
        {% assign week_id = week_id | plus: 1 %}
        <div class="week_id">{{ week_id }}</div>
    {% endif %}
    <div class="date"></div>
    <div class="lab">
        {% if e.lab %}
            {{e.lab}}
        {% endif %}
    </div>
    <div class="hw">
        {% if e.hw %}
            {{e.hw}}
         {% endif %}
    </div>
    <div class="project">
        {% if e.project %}
            {{e.project}}
         {% endif %}
    </div>
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule({{site.data.settings.first}},7,6);
</script>
   

