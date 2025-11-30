import os

def collect_all_code(input_path, output_file):
    print(f"Starting to collect code from {input_path}")
    file_count = 0
    # Define the file extensions we want to collect
    frontend_extensions = ('.js', '.css')

    with open(output_file, 'w', encoding='utf-8') as outfile:
        # os.walk generates the file names in a directory tree
        for root, _, files in os.walk(input_path):
            for filename in files:
                # Check if the filename ends with one of the desired extensions
                if filename.endswith(frontend_extensions):
                    file_count += 1
                    filepath = os.path.join(root, filename)
                    print(f"Reading {filepath}")

                    try:
                        # Use 'r' for reading and 'utf-8' encoding for general compatibility
                        with open(filepath, 'r', encoding='utf-8') as infile:
                            outfile.write(f'\n// ---- Start of {filename} ----\n')
                            outfile.write(infile.read())
                            outfile.write(f'\n// ---- End of {filename} ----\n\n')
                    except Exception as e:
                        # Handle potential reading errors (e.g., permission denied, encoding issues)
                        print(f"Error reading file {filepath}: {e}")
                        outfile.write(f'\n// ---- ERROR reading {filename} ----\n\n')

    print(f"Finished. {file_count} files processed. Output saved to {output_file}")

# Run the function with the new path and desired file types
# The output file name is kept the same for simplicity, but the content is now frontend code.
collect_all_code(r'D:\shopease-frontend\src', 'all_frontend_code.txt')