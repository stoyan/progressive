# Study of progressive vs baseline JPEG encoding

## Methodology and samples

Get 20K random URLs from HTTPArchive
```sql
SELECT url FROM `httparchive.summary_requests.2022_07_01_desktop` where ext='jpg' order by rand() limit 20000
```

Save results as `urls.csv`

`$ split -l 500` into smaller files

Open 10 terminal tabs, start downloading and watching a movie. If anything hangs, kill it.

```sh
$ wget -T 30 -t 1 -i ../urls1
$ wget -T 30 -t 1 -i ../urls2
#...
```

Stop at some point
```
1,465,606,852 bytes (1.58 GB on disk) for 14,511 items
```

Rename files with indexes:
```sh
$ ls -v | cat -n | while read n f; do mv -n "$f" "$n.jpg"; done
```

Find non-jpegs:
```sh
$ identify -regard-warnings *.jpg > ../log.txt
$ node nonjpeg.js > rm.sh
$ sh rm.sh
```

How many are progressive in the raw data:
```sh
$ identify -format "%f,%[interlace]\n" *.jpg > ../prog-or-not.csv
$ node prog-or-not.js
{ prog: 4229, base: 9896 } # 29.94% prog
```

Start generating optimization scripts and run them, e.g.
```sh
$ node opt.sh.js > opt-tran-prog.sh
$ date && sh opt-tran-prog.sh && date
Sat Jul 23 12:28:31 PDT 2022
Sat Jul 23 12:34:56 PDT 2022
```

Gather stats for all files and sizes:
```sh
$ node stats.js > stats.csv
```

.. and just for moz to see how many are progressive now

```sh
identify -format "%f,%b,%[quality],%[interlace]\n" *.jpg > ../stats-moz.csv
```

## Results

![JPEGTran all images](tran-all.png)
![JPEGTran under 30k](tran-30k.png)
![JPEGTran under 52k](tran-52k.png)
![MozJPEG under 6.66k](moz666.png)
![MozJPEG under 30k](moz30k.png)
![MozJPEG under 52k](moz52k.png)
