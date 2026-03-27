from rest_framework import serializers
from .models import Category, Place, Review
from django.db.models import Avg

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.full_name')

    class Meta:
        model = Review
        fields = ['id', 'place', 'user', 'user_full_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']

class PlaceSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name_en')
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = [
            'id', 'category', 'category_name', 'title_en', 'title_ar', 
            'subtitle_en', 'subtitle_ar', 'description_en', 'description_ar', 
            'image1', 'image2', 'image3', 'image4', 'price',
            'latitude', 'longitude', 'slug', 'average_rating', 'reviews'
        ]

    def get_average_rating(self, obj):
        return obj.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
