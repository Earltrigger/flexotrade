
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split

# Load CIFAR-10 data
(x_train, y_train), (x_test, y_test) = cifar10.load_data()

# Normalize images
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# One-hot encode labels
y_train_cat = to_categorical(y_train, 10)
y_test_cat = to_categorical(y_test, 10)

# Split training into training + validation
x_train, x_val, y_train_cat, y_val_cat = train_test_split(
    x_train, y_train_cat, test_size=0.2, random_state=42
)

# Build the model
model = Sequential()
model.add(Flatten(input_shape=(32, 32, 3)))
model.add(Dense(256, activation='relu'))
model.add(Dense(128, activation='relu'))
model.add(Dense(10, activation='softmax'))

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(x_train, y_train_cat, epochs=10, batch_size=64, 
                    validation_data=(x_val, y_val_cat), verbose=2)

# Evaluate on test data
test_loss, test_accuracy = model.evaluate(x_test, y_test_cat, verbose=2)
print(f'Test accuracy: {test_accuracy:.4f}, Test loss: {test_loss:.4f}')

# Predict test labels
y_pred = np.argmax(model.predict(x_test), axis=1)
y_true = y_test.flatten()

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)
class_names = [str(i) for i in range(10)]

plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.tight_layout()
plt.savefig("confusion_matrix.png")
plt.close()

# Classification report
report = classification_report(y_true, y_pred, target_names=class_names, output_dict=True)

# Metrics plot
precision = [report[str(i)]['precision'] for i in range(10)]
recall = [report[str(i)]['recall'] for i in range(10)]
f1_score = [report[str(i)]['f1-score'] for i in range(10)]

x = np.arange(len(class_names))
width = 0.25

plt.figure(figsize=(12, 6))
plt.bar(x - width, precision, width, label='Precision')
plt.bar(x, recall, width, label='Recall')
plt.bar(x + width, f1_score, width, label='F1-Score')

plt.xlabel('Class')
plt.ylabel('Score')
plt.title('Evaluation Metrics per Class')
plt.xticks(x, class_names)
plt.ylim(0, 1)
plt.legend()
plt.tight_layout()
plt.savefig("evaluation_metrics.png")
plt.close()
