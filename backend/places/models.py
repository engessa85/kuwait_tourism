from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Category(models.Model):
    name_en = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/')
    icon_emoji = models.CharField(max_length=10, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name_en)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_en

    class Meta:
        verbose_name_plural = "Categories"

class Place(models.Model):
    category = models.ForeignKey(Category, related_name='places', on_delete=models.CASCADE)
    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    description_en = models.TextField()
    description_ar = models.TextField()
    price_en = models.CharField(max_length=50, blank=True) # e.g., "15 KWD"
    price_ar = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='places/')
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en

class Review(models.Model):
    place = models.ForeignKey(Place, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.place.title_en} by {self.user}"
