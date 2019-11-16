import argparse
import numpy as np
from scipy.spatial.distance import cdist

# Argument specification
parser = argparse.ArgumentParser()
parser.add_argument('--new',
                    required=True,
                    help='Path to the .npy vector of the new repository to be added to marketplace')
parser.add_argument('--old',
                    required=True,
                    help='Path to the .npy vector of an old repository that is on marketplace')
args = parser.parse_args()


def main():
    new, old = np.load(args.new), np.load(args.old)
    assert new.shape[1] == old.shape[1]
    cosine_distances = 1 - cdist(new, old, metric='cosine')
    similarity = np.mean([max(x) for x in cosine_distances])
    print(similarity)
    return similarity


if __name__ == '__main__':
    main()
