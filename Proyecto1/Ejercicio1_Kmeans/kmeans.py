import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans

X=np.array([[8,2],[9,7],[2,12],[9,1],[10,7],[3,14],[8,1],[1,13]])

kmeans = KMeans(n_clusters=3)
kmeans.fit(X)

plt.scatter(X[:,0],X[:,1], c=kmeans.labels_, cmap='rainbow')
plt.show()