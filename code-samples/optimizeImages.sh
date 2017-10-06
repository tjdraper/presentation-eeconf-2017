#!/usr/bin/env bash

# $1 = /path/to/images

# Iterate through files
for f in $(find ${1} -name '*.jpg'); do
    # Get the last mod date of the file
    fileMod=$(date -r ${f} +%s);

    # Get the directory
    dir=$(dirname "${f}")"/";

    # Get opt filename
    optFileName=$(basename "${f}")".opt";

    # Get the full optFileName path
    optFullPath="${dir}${optFileName}";

    # Set last opt time
    lastOptTime=0;

    # Check if a file for optimization time exists
    if [ -f "${optFullPath}" ]; then
         lastOptTime=$(date -r ${optFullPath} +%s);
    fi

    # Check if last opt time is less than last mod time
    if (( lastOptTime < fileMod )); then
        # Mention optimization
        echo "Optimizing ${f}";

        # Run optimization
        /usr/bin/convert ${f} -sampling-factor 4:2:0 -strip -filter Triangle -define filter:support=2 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 70 -define jpeg:fancy-upsampling=off -interlace JPEG -colorspace sRGB ${f};

        # Create the last opt time file
        touch ${optFullPath};
    fi
done;
