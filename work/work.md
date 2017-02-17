---
layout: default
permalink: /work/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr.

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Deadline (11:59pm)</div>
    <div class="hw">Assignments</div>
    <div class="project">Project</div>

</div>

{% for e in site.data.work %}
<div class="week {% cycle "odd", "even" %}">
    <div class="week_id">{{forloop.index}}</div>
    <div class="date"></div>
    <div class="lab">
        {% if e.handout %}
        <a href="{{e.handout}}">{{e.hw}}</a>
        {% else %}
        {{e.hw}}
        {% endif %}
    </div>
    <div class="lab">
        {% if e.project %}
        <a href="project/">{{e.project}}</a>
         {% endif %}
    </div>
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule("20170102",7,6);
</script>
   

