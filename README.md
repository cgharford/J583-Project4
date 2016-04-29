# Data Visualization Project using Node/Angular/D3

This project is a data visualization application that focuses on the statistics
regrading police-involved deaths recorded from 2013-2015. The project includes
an angular component and two interactive d3 graphs.

Follow these steps to install and run this project.

Clone this repository into your vagrant sites folder using the following
command:

    $ git clone https://github.com/cgharford/J583-Project4

Once you have cloned the git repository, cd into the project, make sure vagrant
is running, and install dependencies on your computer (NOT THE VAGRANT MACHINE):

    $ cd J583-Project4
    $ vagrant up
    $ npm install

Log into your vagrant machine:

    $ vagrant ssh

Move to the shared folder and start the server using these commands:

    $ cd /vagrant/J583-Project4
    $ nodejs index.js

Please note that the last command may either use 'node' or 'nodejs', depending
on which version you have installed on your computer.

Navigate to http://localhost:3000/ and explore the data.
