import subprocess
import os
import argparse
import numpy as np

# Argument specification
parser = argparse.ArgumentParser()
parser.add_argument('--path',
                    required=True,
                    help='Path to the new repository to be added to marketplace')
args = parser.parse_args()

ID = str(os.path.split(args.path)[-1])

print('Preprocessing code repository...')
subprocess.call('bash preprocess.sh %s %s' % (args.path, ID),
                shell=True,
                cwd='code2vec',
                stdout=open('/dev/null', 'w'),
                stderr=open('/dev/null', 'w'))

print('Calculating code2vec vectors...')
subprocess.call('python3.7 code2vec.py ' +
                '--load models/java14_model/saved_model_iter8.release ' +
                '--test %s ' % os.path.join('data', ID, ID + '.test.c2v') +
                '--export_code_vectors',
                shell=True,
                cwd='code2vec',
                )

with open(os.path.join('code2vec', 'data', ID, '%s.test.c2v.vectors' % ID), 'r') as f:
    lines = f.readlines()

embedding_dim = 384
embedded_vector = [[]] * len(lines)
for i, line in enumerate(lines):
    line = line.replace('\\n', '')
    current_vector = [float(num) for num in line.split(' ')]
    embedded_vector[i] = current_vector
    assert len(current_vector) == embedding_dim

# Save 2D embedded vector list as a pickled np.array object
print('Saving embedded vector as "code_vector.npy"...')
embedded_vector = np.asarray(embedded_vector)
np.save('code_vector.npy', embedded_vector)

# Remove the 'data' directory to remove previous code2vec vectors and other preprocessed files
subprocess.call('rm -rf data',
                shell=True,
                cwd='code2vec')

# Remove log.txt file
subprocess.call('rm log.txt',
                shell=True,
                stdout=open('/dev/null', 'w'),
                stderr=open('/dev/null', 'w'))

