---
layout: default
permalink: /schedule/
---

## Lectures

<div class="week hrow">
    <div class="week_id">Week</div>
    <div class="date">Date</div>
	<div class="topic">Topic</div>
    <div class="notes">Notes</div>
    <div class="readings">Readings</div>
</div>

{% for lecture in site.data.schedule.lectures %}
<div class="week {% cycle "odd", "even" %}">
    <div class="week_id">{{forloop.index}}</div>
    <div class="date"></div>
	<div class="topic">{{lecture.topic}}</div>
    <div class="notes">
                    <ul>
                        {% for note in lecture.notes %}
                            {% for pair in note %}
                                {% if pair[1] == nil %}
                                    <li>{{note}}</li>
                                {% else %}
                                    <li><a href="{{pair[1] | absolute_url }}">{{pair[0]}}</a></li>
                                {% endif %}
                            {% endfor %}
    					{% endfor %}
                    </ul>
    </div>
    <div class="readings">
                    <ul>
                    {% for reading in lecture.readings %}
                        {% for pair in reading %}
                            {% if pair[1] == nil %}
                                <li>{{reading}}</li>
                            {% else %}
                                <li><a href="{{pair[1] | absolute_url  }}">{{pair[0]}}</a></li>
                            {% endif %}
                        {% endfor %}
					{% endfor %}
                    </ul>
    </div>
</div>
{% endfor %}

<script type="text/javascript">
   make_schedule(0);
</script>
