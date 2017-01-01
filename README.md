# [CSCC09 Programming on the Web ( Winter 2017)](https://cscc09-f16.github.io/)

This is the source code for the CSCC09 Winter 2017 course website.

The site is built using [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).
Code is based on [@CSC309-Fall-2016/CSC309-Fall-2016.github.io](https://github.com/CSC309-Fall-2016/CSC309-Fall-2016.github.io).

Enjoy the course!

## Development

### 0. Fork and clone the repo
From GitHub, fork this repo to your account, then clone it to your local machine.

### 1. Install [RVM](https://rvm.io/)
```shell
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ curl -sSL https://get.rvm.io | bash -s stable
```

You might need to source the RVM config file. Read the instructions on screen carefully.

You can also alternatively use [rbenv](https://github.com/rbenv/rbenv) to manage your Ruby environment.

### 2. Use the latest version of Ruby
```shell
$ rvm --default use 2.3.1
```

### 3. Install Bundler (dependancy manager)
```
$ gem install bundler
```

### 4. Install dependencies
In the local repo directory:

```shell
$ bundle install
```

### 5. Serve the site locally
```
$ bundle exec jekyll serve
```

A local server will be started on <http://localhost:4000>.


## Contributing

### 0. Ensure your branch is up to date
To pull changes from the original repo, set up a remote to do so:

```shell
$ git remote add upstream git@github.com:CSC309-Fall-2016/CSC309-Fall-2016.github.io.git
$ git pull upstream master
$ git push origin master
```

### 1. Make a new branch
Generally, it's a good idea to branch out your changes and then push them.

```shell
$ git checkout -b branchname
```

### 2. Make changes
You can make changes anywhere in the posts/layouts. This might be a good place to start if you're new to Jekyll: <https://jekyllrb.com/docs/>.

### 3. Push changes
The changes made should reload live on your local server. Once you're satisfied with your changes, push the new branch to your forked repo.

```shell
$ git push origin branchname
```

### 4. Create a pull request
On GitHub, you can click the "New Pull Request" button, where you can then verify your changes and submit it for review.
