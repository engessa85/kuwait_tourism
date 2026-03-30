from rest_framework import viewsets, permissions
from .models import Category, Place, Review, Favorite
from .serializers import CategorySerializer, PlaceSerializer, ReviewSerializer, FavoriteSerializer
from .permissions import IsOwnerOrReadOnly

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = Review.objects.all()
        user_me = self.request.query_params.get('user_me')
        if user_me == 'true' and self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user)
        
        place_id = self.request.query_params.get('place')
        if place_id:
            queryset = queryset.filter(place_id=place_id)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
