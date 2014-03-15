#!/usr/bin/env ruby

require 'open-uri'
require 'csv'
require 'digest/md5'

def gen_thumbnail(url, path)
  digest = Digest::MD5.hexdigest(url)
  puts `./bin/rasterize.js #{url} #{path}/#{digest}.png \"1200px*800px\"`
end

CSV_URL = "https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv"
data    = CSV.parse(open(CSV_URL).read, :headers => true)
data.select{|row| row["website"] }.each do |row|
  puts "Generate thumbnail for #{row["name"]}"
  gen_thumbnail(row["website"], "./images/bin")
end

